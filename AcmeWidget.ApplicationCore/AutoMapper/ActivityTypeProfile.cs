using AcmeWidget.ApplicationCore.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.AutoMapper
{
    public class ActivityTypeProfile : Profile
    {
        public ActivityTypeProfile()
        {
            CreateMap<Activity.ActivityType, Activity.ActivityTypeModel>()
                 .ForMember(dest =>
                    dest.Type,
                    opt => opt.MapFrom(src => (int)src))
                 .ForMember(dest =>
                    dest.Name,
                    opt => opt.MapFrom(src => Enum.GetName(src)))
                .ReverseMap();
        }
    }
}
