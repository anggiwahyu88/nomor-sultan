export default function ListContact({ title, icon, FontAwesomeIcon}) {
  return (
    <div className="footer-card-contact">
      <p className="flex">
        <FontAwesomeIcon icon={icon} className="m-auto" />
      </p>
      <p>{title}</p>
    </div>
  );
}
