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
                return null;
            }
            var res = new Expert { 
                Email = expert.Email.ToLower(),
                Username = expert.Username.ToLower()
            };
            _context.Experts.Add(res);
            _context.SaveChanges();
            return expert;
        }

        public string DeleteExpert(string email)
        {
            var existingExpert = _context.Experts.FirstOrDefault(e => e.Email == email);
            if (existingExpert == null)
            {
                return "Expert was not found";
            }

            _context.Experts.Remove(existingExpert);
            _context.SaveChanges();
            return string.Concat($"User with email: {email} was deleted");
        }

        public Expert GetExpertByEmail(string email)
        {
            return _context.Experts.FirstOrDefault(e => e.Email == email);
        }

        public Expert UpdateExpert(UpdateUserData updateUser)
        {
            var updateUserData = new UpdateUserData { 
                NewEmail = updateUser.NewEmail.ToLower(),
                NewUsername = updateUser.NewUsername.ToLower(),
                OldEmail = updateUser.OldEmail.ToLower(),
                OldUsername = updateUser.OldUsername.ToLower()
            };
            var existingExpert = _context.Experts.FirstOrDefault(e => e.Email == updateUserData.OldEmail && e.Username == updateUserData.OldUsername);

            if (existingExpert == null || (updateUserData.OldUsername == updateUserData.NewUsername && updateUserData.OldEmail == updateUserData.NewEmail))
            {
                return null;
            }

            existingExpert.Username = updateUserData.NewUsername;
            existingExpert.Email = updateUserData.NewEmail;

            _context.SaveChanges();
            return existingExpert;
        }

    }
}
