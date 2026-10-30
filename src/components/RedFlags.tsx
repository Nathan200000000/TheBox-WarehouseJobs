// Common warning signs of fake warehouse job offers.
export const RED_FLAGS = [
  "You're asked to pay for training, equipment, a background check, or to apply",
  "The “recruiter” only talks over text or a chat app, never through the company",
  "The email comes from a free address (like Gmail) instead of the company's domain",
  "You're offered the job without an interview or application on the official site",
  "They ask for your bank details or Social Security number before a formal offer",
  "The pay is far above what the same role pays elsewhere",
  "You're told to deposit a check and send part of the money back",
];

export default function RedFlags() {
  return (
    <ul className="grid gap-3">
      {RED_FLAGS.map((flag) => (
        <li key={flag} className="flex gap-3">
          <span aria-hidden="true" className="font-bold text-red-600 dark:text-red-400">!</span>
          <span>{flag}</span>
        </li>
      ))}
    </ul>
  );
}
