import { GetResult } from "@prisma/client/runtime";
export type EventType = GetResult<
  {
    id: string;
    title: string;
    details: string;
    location: string;
    organizers: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    image: string | null;
    userId: string;
  },
  any
> & {};

const EventTableRow = ({
  idx,
  eventDetail,
}: {
  idx: number;
  eventDetail: EventType;
}) => {
  const date = new Date(eventDetail.createdAt);

  const dd = String(date.getUTCDate()).padStart(2, "0"); // Day
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month (+1 because months are zero-based)
  const yy = String(date.getUTCFullYear()).slice(-2); // Last two digits of the year

  const formattedDate = `${dd}/${mm}/${yy}`;

  return (
    <tr className="hover:bg-inherit/80 opacity-80">
      <td className="px-6 py-4 opacity-40 capitalize">{idx + 1}</td>
      <td className="px-6 py-4 capitalize font-bold text-lg opacity-100">
        {eventDetail.title}
      </td>

      {/* <RowStatus status={eventDetail.status} /> */}
      {/* <td className="px-6 py-4 capitalize">{eventDetail.Role}</td> */}
      <td className="px-6 py-4 capitalize opacity-95">
        {eventDetail.organizers}
      </td>
      <td className="px-6 py-4 capitalize">{formattedDate}</td>
      <td className="px-6 py-4 capitalize">
        <div className="">
          <p>Oct 10 2023</p>
          <p>8:00am - 11:00am</p>
        </div>
      </td>

      <td className="px-6 py-4 capitalize">5,340</td>
      <td className="px-6 py-4 capitalize">{eventDetail.price}</td>
      <td className="px-6 py-4 capitalize">{eventDetail.location}</td>
    </tr>
  );
};

export default EventTableRow;
