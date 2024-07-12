import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../db";
import moment from "moment";
import { getDefaultDates } from "../utils";

export const checkinRegister = async (subscriptionId: number) => {
  const newCheckin = await prisma.checkin.create({
    data: {
      subscriptionId,
      status: true,
    },
  });

  if (!newCheckin)
    return {
      message: "Error en el registro del checkin",
      statuscode: 409,
    };
  return { message: "Asistencia registrada exitosamente", statuscode: 200 };
};

export const findSuscriptionOnCheckin = async (subscriptionId: number) => {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  return prisma.checkin.findFirst({
    where: {
      subscriptionId,
      createdAt: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });
};

export const findCurrentAttendances = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) => {
  const startTodayUTC = moment(getDefaultDates().endDate)
    .utc()
    .startOf("day")
    .toISOString();
  const endTodayUTC = moment(getDefaultDates().endDate)
    .utc()
    .endOf("day")
    .toISOString();
  const attendances = await prisma.checkin.findMany({
    where: {
      status: true,
      createdAt: {
        gte: startTodayUTC,
        lte: endTodayUTC,
      },
    },
    select: {
      Subscription: {
        select: {
          Client: {
            select: {
              Person: {
                select: {
                  firstname: true,
                  lastname: true,
                  photo: true,
                },
              },
            },
          },
          Discipline: {
            select: {
              label: true,
            },
          },
        },
      },
      createdAt: true,
    },
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalLength = await prisma.checkin.count({
    where: {
      status: true,
      createdAt: {
        gte: startTodayUTC,
        lte: endTodayUTC,
      },
    },
  });

  const attendancesParsed = attendances.map((attendance) => {
    return {
      firstname: attendance.Subscription?.Client.Person?.firstname,
      lastname: attendance.Subscription?.Client.Person?.lastname,
      photo: attendance.Subscription?.Client.Person?.photo,
      Discipline: {
        label: attendance.Subscription?.Discipline.label,
      },
      createdAt: attendance.createdAt,
      display_name: `${
        attendance.Subscription?.Client.Person?.firstname || ""
      }  ${attendance.Subscription?.Client.Person?.lastname || ""} `,
    };
  });

  return {
    attendances: attendancesParsed,
    totalLength,
  };
};
