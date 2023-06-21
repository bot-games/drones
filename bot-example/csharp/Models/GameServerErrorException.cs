using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public class GameServerErrorException : Exception
    {
        public Error? Error { get; }

        public GameServerErrorException(Error? error)
        {
            Error = error;
        }
    }
}
