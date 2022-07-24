using AcmeWidget.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Runtime.Serialization;
using static AcmeWidget.ApplicationCore.Models.Activity;

namespace AcmeWidget.ApplicationCore.DTOs
{
    public class ActivityDTO 
    { 
        public int? ActivityId { get; set; }
        public ActivityType Type { get; set; }
        public string? Name { get => Enum.GetName(Type); }
    }
}
