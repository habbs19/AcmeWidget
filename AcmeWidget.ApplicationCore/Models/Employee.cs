using AcmeWidget.ApplicationCore.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.Models
{
    public class Employee : IModel<int>
    {
        public int EmployeeId { get => Id; set { Id = value; } }  
        public string FirstName { get; set; } = null!;   
        public string LastName { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;

    }
}
