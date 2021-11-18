using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Services
{
    public class ReturnRequestService : IReturnRequestService
    {
        private readonly ApplicationDbContext _context;

        public ReturnRequestService(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
