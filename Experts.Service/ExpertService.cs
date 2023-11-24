using Architecture.Data;
using Architecture.Data.Entities;
using Experts.Service.Contracts;

namespace Experts.Service
{
    public class ExpertService : IExpertService
    {
        readonly ArchitectureDbContext _context;
        public ExpertService(ArchitectureDbContext context)
        {
            _context=context;
        }

        public Expert CreateExpert(Expert expert)
        {
            // Check if an expert with the same email already exists
            var existingExpert = _context.Experts.FirstOrDefault(e => e.Email == expert.Email);
            if (existingExpert != null)
            {
                throw new Exception("An expert with the same email already exists.");
            }

            _context.Experts.Add(expert);
            _context.SaveChanges();
            return expert;
        }

        public void DeleteExpert(string email)
        {
            var existingExpert = _context.Experts.FirstOrDefault(e => e.Email == email);
            if (existingExpert == null)
            {
                throw new Exception("Expert not found.");
            }

            _context.Experts.Remove(existingExpert);
            _context.SaveChanges();
        }

        public Expert GetExpertByEmail(string email)
        {
            return _context.Experts.FirstOrDefault(e => e.Email == email);
        }

        public Expert UpdateExpert(string email, Expert expert)
        {
            var existingExpert = _context.Experts.FirstOrDefault(e => e.Email == email);
            if (existingExpert == null)
            {
                throw new Exception("Expert not found.");
            }

            existingExpert.Name = expert.Name;
            existingExpert.Email = expert.Email;

            _context.SaveChanges();
            return existingExpert;
        }
    }
}
