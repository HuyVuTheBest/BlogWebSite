using System.Linq;

namespace blog_Backend.Service
{

    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile imageFile);

        void DeleteFile(string filePath);
    }
    public class FileService : IFileService
    {

        private readonly IWebHostEnvironment _environment;
        private readonly string[] _allowedFileExtensions = { ".jpg", ".jpeg", ".png" };


        public FileService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        public void DeleteFile(string filePath)
        {
            throw new NotImplementedException();
        }

        public async  Task<string> SaveFileAsync(IFormFile imageFile)
        {
            if(imageFile== null)
            {
                throw new ArgumentNullException(nameof(imageFile));
            }


            
            var uploadsFolder = Path.Combine(_environment.WebRootPath, "Uploads");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Check the allowed extenstions
            var ext = Path.GetExtension(imageFile.FileName).ToLowerInvariant();
            if (!_allowedFileExtensions.Contains(ext))
            {
                throw new ArgumentException("Invalid file type.");
            }

            // generate a unique filename
            var fileName = $"{imageFile.FileName}{ext}";
            var fileNameWithPath = Path.Combine(uploadsFolder, fileName);
            using var stream = new FileStream(fileNameWithPath, FileMode.Create);
            await imageFile.CopyToAsync(stream);
            return fileName;



        }
    }
}
