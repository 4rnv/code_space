import mongoose, { Model } from "mongoose";

export interface PlayerDetails {
    user_id: mongoose.Types.ObjectId;
    email: string;
    username: string;
    full_name: string;
}

export interface IUserChallenges {
    players: PlayerDetails[];
    language: string;
    time: number;
    problem_id: mongoose.Types.ObjectId;
    player1_code: string;
    player2_code: string;
    player1_test_cases: number;
    player2_test_cases: number;
    winner: mongoose.Types.ObjectId;
    rating_change: Record<string, number>;
    active: boolean;
    start_time: Date;
    room_code: string;
    status: string;
    is_private: boolean;
}

const PlayerSchema = new mongoose.Schema<PlayerDetails>({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    full_name: { type: String, required: true },
});

const UserChallengesSchema = new mongoose.Schema<IUserChallenges>(
    {
        players: [PlayerSchema],
        language: {
            type: String,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        problem_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        player1_code: {
            type: String,
            default: '',
        },
        player2_code: {
            type: String,
            default: '',
        },
        player1_test_cases: {
            type: Number,
            default: 0,
        },
        player2_test_cases: {
            type: Number,
            default: 0,
        },
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        rating_change: {
            type: Map,
            of: Number,
            default: {},
        },
        active: {
            type: Boolean,
            default: true,
        },
        start_time: {
            type: Date,
        },
        room_code: {
            type: String,
            unique: true,
            sparse: true,
            index: true,
        },
        status: {
            type: String,
            enum: ["waiting", "active", "completed", 'stale'],
            default: "waiting",
        },
        is_private: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);

const UserChallengesModel = mongoose.model<IUserChallenges>("UserChallenges", UserChallengesSchema);

export default UserChallengesModel;
