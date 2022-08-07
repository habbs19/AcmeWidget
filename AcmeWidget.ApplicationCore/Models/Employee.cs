using AcmeWidget.ApplicationCore.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.Models
{
    public class Employee : IModel<int>
    {
        [ForeignKey("ActivityForm")]
        public int EmployeeId { get => Id; set { Id = value; } }  
        public string FirstName { get; set; } = null!;   
        public string LastName { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;

        public virtual ActivityForm Form { get; set; } = null!;

    }
}
