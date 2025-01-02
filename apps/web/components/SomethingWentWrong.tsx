export default function SomethingWentWrong({ err }: { err: Error }) {
  console.log(err)
  return (
    <div className="flex flex-col">
      <div className="text-center align-middle text-xl">Something went wrong!</div>
      <div className="text-center align-middle text-base">{String(err)}</div>
    </div>
  )
}
