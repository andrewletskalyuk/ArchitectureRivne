using System.ComponentModel.DataAnnotations;

namespace Architecture.Data.Entities
{
    public class Expert
    {
        [Key]
        public int Id { get; set; }
        
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "default@gmail.com";
    }
}
