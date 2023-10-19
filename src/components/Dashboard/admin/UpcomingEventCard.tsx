import { FaUser } from "react-icons/fa";
import { MdOutlineAccessAlarms, MdOutlineLocationOn } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
export function UpcomingEventCard({ event }) {
  return (
    <div className="bg-white dark:bg-white/10 shadow p-2  gap-4 flex rounded w-fit">
      <div className="h-4 w-4 rounded-full bg-purple-600"></div>
      <div className="">
        <p className="text-sm">NOV 20 TUESDAY</p>
        <h2 className="font-bold my-2 text-black dark:text-white">
          {event.title}
        </h2>
        <div className="grid grid-cols-2 text-sm gap-2">
          <div>
            <div className="text-xs flex opacity-60">
              <MdOutlineAccessAlarms size={16} />
              Time
            </div>{" "}
            <p>8:00AM - 10:00AM</p>
          </div>

          <div>
            <div className="text-xs flex opacity-60">
              <MdOutlineLocationOn size={16} />
              Venue
            </div>{" "}
            <p>{event.location}</p>
          </div>

          <div className=" flex gap-2 items-center ">
            <PiUsersThreeLight size={20} />
            <p>
              {" "}
              <strong className="text-black dark:text-white text-lg">
                456
              </strong>{" "}
              Attendees
            </p>
          </div>
          <div className=" flex gap-2 items-center ">
            <LiaMoneyBillWaveSolid size={20} />
            <p>
              {" "}
              <strong className="text-green-700 dark:text-green-400 text-lg">
                453
              </strong>{" "}
              Paid
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
