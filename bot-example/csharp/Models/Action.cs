using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp.Models
{
    public readonly struct Action
    {
        public readonly float X;

        public readonly float Y;

        public readonly float Torque;

        public Action(float x, float y, float torque)
        {
            X = x;
            Y = y;
            Torque = torque;
        }
    }
}
