using System;
using System.ComponentModel.DataAnnotations;

namespace EFTestJob.Models
{
  public class User
  {
    [Required]
    	public int UserId {get; set;}
	  [Required]
    public DateTime DReg {get; set;}
    [Required]
	  public DateTime DLastAct {get; set;}
  }
}
