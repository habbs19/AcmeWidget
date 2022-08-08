using AcmeWidget.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.DTOs
{
    public class ActivityFormDTO
    {
        public int? FormId { get; set;}

        [Required]
        public EmployeeDTO Employee { get; set; } = null!;

        [Required]
        public ActivityDTO Activity { get; set; } = null!;
        public string Comments { get; set; } = null!;
    }
}
