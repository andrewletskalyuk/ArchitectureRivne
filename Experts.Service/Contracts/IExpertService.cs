using Architecture.Data.Entities;

namespace Experts.Service.Contracts
{
    public interface IExpertService
    {
        /// <summary>
        /// Creates a new expert.
        /// </summary>
        /// <param name="expert">The expert object to be created.</param>
        /// <returns>The created expert.</returns>
        Expert CreateExpert(Expert expert);

        /// <summary>
        /// Retrieves an expert by their email address.
        /// </summary>
        /// <param name="email">The email address of the expert to retrieve.</param>
        /// <returns>The expert with the specified email address.</returns>
        Expert GetExpertByEmail(string email);

        /// <summary>
        /// Updates an existing expert's information by their email address.
        /// </summary>
        /// <param name="email">The email address of the expert to update.</param>
        /// <param name="expert">The updated expert information.</param>
        /// <returns>The updated expert.</returns>
        Expert UpdateExpert(UpdateUserData expert);

        /// <summary>
        /// Deletes an expert by their email address.
        /// </summary>
        /// <param name="email">The email address of the expert to delete.</param>
        string DeleteExpert(string email);

    }
}
