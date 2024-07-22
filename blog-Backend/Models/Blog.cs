using System;
using System.Collections.Generic;

namespace blog_Backend.Models;

public partial class Blog
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? BlogContent { get; set; }

    public string? Image { get; set; }

    public bool? IsFeatured { get; set; }

    public int? CategoryId { get; set; }
    public Category Category { get; set; }  
}
