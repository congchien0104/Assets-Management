using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Models.Assignments;
using RookieOnlineAssetManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interfaces
{
    public interface IAssignmentService
    {
        // Assigned Date is current date by default
        // Admin can select only current or future date for Assigned Date
        // THEN assignment is created with state “Waiting for acceptance”
        public Task<int> Create(AssignmentCreateRequest request);
        // Note: Delete icon is enabled for only "Waiting for acceptance" assignment
        public Task<bool> Delete(int assignmentId); 
        public Task<AssignmentVM> GetDetailedAssignment(int assignmentId);
        // Note: Edit icon is only enabled for assignments have state is Waiting for acceptance. Select user and asset
        public Task<bool> Update(AssignmentUpdateRequest request);
        public Task<PagedResultBase<AssignmentVM>> GetAssignmentPagingFilter(AssignmentPagingFilterRequest request);
        public List<StateVM> GetAssignmentStates();
        public Task<bool> RespondAssignment(int assignmentId, bool isAccepted);
        public Task<List<AssignmentVM>> GetOwnAssignments(AssignmentPagingFilterRequest request, string userName);

        // Note: Return icon is only enabled for assignments have state is Accepted
    }
}
