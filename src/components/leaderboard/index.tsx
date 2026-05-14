// src/components/leaderboard/index.tsx

type TopPlayerCardProps = {
  medal: string;
  name: string;
  points: string;
  courses: string;
  medalColor: string;
  featured?: boolean;
};

function TopPlayerCard({
  medal,
  name,
  points,
  courses,
  medalColor,
  featured = false,
}: TopPlayerCardProps) {
  return (
    <div
      className={`relative rounded-2xl border bg-white p-6 text-center shadow-sm ${
        featured
          ? "border-amber-400 shadow-md"
          : "border-gray-200"
      }`}
    >
      {featured && (
        <div className="absolute right-4 top-0 rounded-b-lg bg-amber-400 px-3 py-1 text-[10px] font-bold text-black">
          TOP
        </div>
      )}

      <div
        className="text-4xl font-extrabold"
        style={{ color: medalColor }}
      >
        {medal}
      </div>

      <h3 className="mt-3 text-base font-semibold text-gray-900">
        {name}
      </h3>

      <div
        className={`mt-2 font-extrabold ${
          featured
            ? "text-3xl text-amber-500"
            : "text-2xl text-blue-600"
        }`}
      >
        {points}
      </div>

      <p className="mt-1 text-sm text-gray-500">
        pts · {courses}
      </p>
    </div>
  );
}

type LeaderboardRowProps = {
  rank: number;
  initials: string;
  name: string;
  courses: string;
  badges: string;
  points: string;
  avatarClass?: string;
  rankClass?: string;
  highlight?: boolean;
  isYou?: boolean;
};

function LeaderboardRow({
  rank,
  initials,
  name,
  courses,
  badges,
  points,
  avatarClass = "from-blue-500 to-indigo-600",
  rankClass = "text-gray-700",
  highlight = false,
  isYou = false,
}: LeaderboardRowProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl px-3 py-3 transition ${
        highlight
          ? "bg-blue-50 border border-blue-100"
          : "border-b border-gray-100"
      }`}
    >
      {/* Rank */}
      <div
        className={`w-6 text-center text-sm font-bold ${rankClass}`}
      >
        {rank}
      </div>

      {/* Avatar */}
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${avatarClass}`}
      >
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-800">
          {name}

          {isYou && (
            <span className="ml-2 text-xs font-medium text-blue-600">
              (you)
            </span>
          )}
        </h3>

        <p className="text-xs text-gray-500">
          {courses} · {badges}
        </p>
      </div>

      {/* Points */}
      <div className="text-sm font-bold text-gray-800">
        {points}
      </div>
    </div>
  );
}

function Leaderboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Top 3 */}
      <section className="grid gap-4 md:grid-cols-3">
        <TopPlayerCard
          medal="🥈"
          name="Priya Sharma"
          points="3,120"
          courses="9 courses"
          medalColor="#C0C0D0"
        />

        <TopPlayerCard
          medal="🥇"
          name="Ravi Menon"
          points="4,560"
          courses="13 courses"
          medalColor="#F59E0B"
          featured
        />

        <TopPlayerCard
          medal="🥉"
          name="Ananya Iyer"
          points="2,980"
          courses="8 courses"
          medalColor="#CD7F32"
        />
      </section>

      {/* Full Rankings */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Full Rankings
        </h2>

        <div className="space-y-2">
          <LeaderboardRow
            rank={1}
            initials="RM"
            name="Ravi Menon"
            courses="13 courses"
            badges="5 badges"
            points="4,560 pts"
            rankClass="text-amber-500"
          />

          <LeaderboardRow
            rank={2}
            initials="PS"
            name="Priya Sharma"
            courses="9 courses"
            badges="4 badges"
            points="3,120 pts"
            avatarClass="from-slate-500 to-indigo-900"
            rankClass="text-gray-400"
          />

          <LeaderboardRow
            rank={3}
            initials="AI"
            name="Ananya Iyer"
            courses="8 courses"
            badges="3 badges"
            points="2,980 pts"
            avatarClass="from-red-400 to-orange-900"
            rankClass="text-amber-700"
          />

          <LeaderboardRow
            rank={4}
            initials="AK"
            name="Arjun Kumar"
            courses="7 courses"
            badges="4 badges"
            points="2,840 pts"
            highlight
            isYou
          />

          <LeaderboardRow
            rank={5}
            initials="KR"
            name="Kavya Rao"
            courses="6 courses"
            badges="2 badges"
            points="2,410 pts"
            avatarClass="from-emerald-400 to-emerald-900"
          />
        </div>
      </section>
    </div>
  );
}

export default Leaderboard;