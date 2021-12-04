using Microsoft.EntityFrameworkCore;
using Moq;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Data.Entities;
using RookieOnlineAssetManagement.Data.Enums;
using RookieOnlineAssetManagement.Models.Assignments;
using RookieOnlineAssetManagement.Services;
using RookieOnlineAssetManagement.Shared;
using System;
using System.Threading.Tasks;
using Xunit;

namespace RookieOnlineAssetManagement.UnitTests
{
    public class AssignmentServiceTest
    {
        private readonly AssignmentService _assignmentService;
        private Mock<FakeUserManager> _mockUserManager;

        public AssignmentServiceTest()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
             .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
             .Options;
            using (var context = new ApplicationDbContext(options))
            {
                context.Categories.AddRange(
                   new Category
                   {
                       Id = 1,
                       Name = "Personal Computer",
                       Code = "PC",
                   },
                   new Category
                   {
                       Id = 2,
                       Name = "Laptop",
                       Code = "LA",
                   });
                context.Assets.AddRange(
                    new Asset
                    {
                        Id = 1,
                        Code = "PC000001",
                        Name = "Tuan",
                        Specification = "Lorem ipsum ",
                        InstalledDate = DateTime.Now,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now,
                        State = AssetState.Assigned,
                        CategoryId = 1,
                        Location = "HCM"
                    },
                    new Asset
                    {
                        Id = 2,
                        Code = "PC000002",
                        Name = "Xuan",
                        Specification = "Lorem ipsum ",
                        InstalledDate = DateTime.Now,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now,
                        State = AssetState.Available,
                        CategoryId = 2,
                        Location = "HCM"
                    },
                    new Asset
                    {
                        Id = 3,
                        Code = "LA000002",
                        Name = "Tuan",
                        Specification = "Lorem ipsum ",
                        InstalledDate = DateTime.Now,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now,
                        State = AssetState.Assigned,
                        CategoryId = 2,
                        Location = "HCM"
                    });
                context.Users.AddRange(
                    new User
                    {
                        Id = 1,
                        FirstName = "xuan",
                        LastName = "tuan",
                        UserName = "xuantuan1",
                    },
                     new User
                     {
                         Id = 2,
                         FirstName = "xuan",
                         LastName = "tuan",
                         UserName = "xuantuan2",
                     }
                    );
                context.Assignments.AddRange(
                    new Assignment
                    {
                        Id = 1,
                        AssignedBy = 1,
                        AssignedTo = 2,
                        AssignedDate = new DateTime(2021, 9, 28),
                        AssetId = 1,
                        State = AssignmentState.Accepted,
                    }, new Assignment
                    {
                        Id = 2,
                        AssignedBy = 1,
                        AssignedTo = 2,
                        AssignedDate = new DateTime(2021, 9, 28),
                        AssetId = 1,
                        State = AssignmentState.Returned,
                    });
                context.ReturnRequests.Add(new ReturnRequest
                {
                    Id = 1,
                    AssignmentId = 2,
                    AcceptedBy = 2,
                    RequestedBy = 1,
                    ReturnedDate = new DateTime(2016, 9, 28),
                    State = ReturnRequestState.Completed
                });
                context.SaveChanges();

            }
            var mockContext = new ApplicationDbContext(options);
            _mockUserManager = new Mock<FakeUserManager>();
            _assignmentService = new AssignmentService(mockContext, _mockUserManager.Object);
        }
        /*
         * Get paging full property filter by state filter by date
         * Get detailed with state diff Accepted and Wating for Acceptance state
         */
        [Fact]
        public async Task GetDetailedAssignmentWhichHasStateAccepted_ReturnAssignmentVM()
        {
            // Arrange
            int assignmentId = 1;
            // Act
            var assignment = await _assignmentService.GetDetailedAssignment(assignmentId);
            // Assert
            Assert.IsType<AssignmentVM>(assignment);
        }
        [Fact]
        public async Task GetDetailedAssignmentWhichHasStateReturned_ReturnExeption()
        {
            // Arrange
            int assignmentId = 2;
            // Act
            Func<Task> act = async () => await _assignmentService.GetDetailedAssignment(assignmentId);
            // Assert
            var exception = await Assert.ThrowsAsync<Exception>(act);
            Assert.Contains("Get detaled assignment will be enable with Accepted and Wating for Acceptance state", exception.Message);
        }
        [Fact]
        public async Task GetAssignmentPagingWithStatesAndAssignedDateFilter_ReturnPagedResultIncludeOneItem()
        {
            // Arrange
            var request = new AssignmentPagingFilterRequest
            {
                StatesFilter = $"{(int)AssignmentState.Accepted},{(int)AssignmentState.WaitingForAcceptance}",
                AssignedDateFilter = new DateTime(2021, 9, 28).Date.ToString()
            };
            // Act
            var assignments = await _assignmentService.GetAssignmentPagingFilter(request);
            // Assert
            Assert.IsType<PagedResultBase<AssignmentVM>>(assignments);
            Assert.Equal(1, assignments.TotalRecords);
        }
    }
}
