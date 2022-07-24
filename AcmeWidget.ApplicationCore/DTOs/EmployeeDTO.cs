using AcmeWidget.ApplicationCore.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.DTOs
{
    public class EmployeeDTO
    {
        public int? EmployeeId { get; set; }
        
        [Required]
        [RegularExpression("^[a-zA-Z]+$")]
        [StringLength(20)]
        public string FirstName { get; set; } = null!;
        
        [Required]
        [RegularExpression("^[a-zA-Z]+$")]
        [StringLength(20)]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; } = null!;

    }
}
