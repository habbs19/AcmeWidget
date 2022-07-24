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
    public class ActivityFormProfile : Profile
    {
        public ActivityFormProfile()
        {
            CreateMap<ActivityForm, ActivityFormDTO>()
                .ForMember(dest =>
                    dest.FormId,
                    opt => opt.MapFrom(src => src.FID))
                .ReverseMap();
        }
    }
}
