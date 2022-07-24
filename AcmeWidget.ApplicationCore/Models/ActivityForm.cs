using AcmeWidget.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.Models
{
    public class ActivityForm : IModel<int>
    {
        public int FID { get => Id; set => Id = value; } 
        
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;
        
        public int ActivityId { get; set; }
        public Activity Activity { get; set; } = null!;
        
        public string Comments { get; set; } = null!;

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedDate { get; set; }
    }
}
