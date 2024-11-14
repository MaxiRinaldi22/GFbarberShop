export function DashboardComponent({title, text} : {title: string, text: string}) {
  return (
    <p className="flex gap-2 font-semibold">
      {title}:
      <span className="font-normal">{text}</span>
    </p>
  );
}
