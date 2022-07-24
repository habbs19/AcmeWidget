using AcmeWidget.ApplicationCore.DTOs;
using AcmeWidget.ApplicationCore.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AcmeWidget.ApplicationCore.AutoMapper
{
    public class ActivityProfile : Profile
    {
        public ActivityProfile()
        {
            CreateMap<Activity, ActivityDTO>()
                .ReverseMap();
        }
    }
}
