import * as z from 'zod'

export const PlayerSchema = z.object({
	kills: z.number(),
	username: z.string(),
})

export type Player = z.infer<typeof PlayerSchema>

export const TeamSchema = z.object({
	name: z.string(),
	place: z.number(),
	players: z.array(PlayerSchema),
	points: z.number(),
	total_kills: z.number(),
})

export type Team = z.infer<typeof TeamSchema>

export const MatchSchema = z.object({
	awayScore: z.number(),
	awayTeam: TeamSchema,
	homeScore: z.number(),
	homeTeam: TeamSchema,
	status: z.string(),
	time: z.string(),
	title: z.string(),
})

export type Match = z.infer<typeof MatchSchema>

export const DataSchema = z.object({
	matches: z.array(MatchSchema),
})

export type Data = z.infer<typeof DataSchema>

export const ApiResponseSchema = z.object({
	data: DataSchema,
	ok: z.boolean(),
})

export type ApiResponse = z.infer<typeof ApiResponseSchema>
