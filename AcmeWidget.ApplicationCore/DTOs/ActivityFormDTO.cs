using AcmeWidget.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.DTOs
{
    public class ActivityFormDTO
    {
        public int? FormId { get; set;}
        public EmployeeDTO Employee { get; set; } = null!;
        public ActivityDTO Activity { get; set; } = null!;
        public string Comments { get; set; } = null!;
    }
}
