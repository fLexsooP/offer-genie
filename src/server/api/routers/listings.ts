import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.listing.findMany();
  }),
  get: publicProcedure
    .input(z.object({ listingId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.listing.findUnique({
        where: {
          id: input.listingId,
        },
      });
    }),
  getMessage: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.auth.userId;
      const listing = await ctx.prisma.listing.findMany({
        where: {
          userId,
        },
        include: {
          message: true,
        },
      });
      return listing.flatMap((item) => item.message);
    }),
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string(), listingId: z.string(), fromUserName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const message = await ctx.prisma.message.create({
        data: {
          fromUser: ctx.auth.userId,
          fromUserName: input.fromUserName,
          message: input.message,
          listingId: input.listingId,
        },
      });
      return message;
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      const listing = await ctx.prisma.listing.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
      return listing;
    }),
});
