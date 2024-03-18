export default function dateFormatter(data)
{
  const date=new Date(data)
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate
}