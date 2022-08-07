using AcmeWidget.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcmeWidget.ApplicationCore.Models
{
    public class Activity : IModel<int>
    {
        [ForeignKey("ActivityForm")]
        public int ActivityId { get => Id; set { Id = value; } }
        public ActivityType Type { get; set; }

        public virtual ActivityForm Form { get; set; } = null!;

        public enum ActivityType
        {
            Painting,
            DodgeBall,
            ScavengerHunt,
            MountainClimbing,
            DragRacing
        }

        public class ActivityTypeModel
        {
            public int Type { get; set; }
            public string Name { get; set; }
        }
    }
}
