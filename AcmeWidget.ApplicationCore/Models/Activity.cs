using AcmeWidget.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace AcmeWidget.ApplicationCore.Models
{
    public class Activity : IModel<int>
    {
        public int ActivityId { get => Id; set { Id = value; } }
        public ActivityType Type { get; set; }

        public enum ActivityType
        {
            Painting,
            DodgeBall,
            ScavengerHunt,
            MountainClimbing,
            DragRacing
        }
    }
}
