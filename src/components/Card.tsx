import classNames from "classnames";

export default function Card({
  title,
  icon,
  children,
  loading,
  disableAutoHeight,
  actions,
  collapsible,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  disableAutoHeight?: boolean;
  actions?: {
    icon: React.ReactNode;
    onClick: () => void;
  }[];
  collapsible?: boolean;
}) {
  const id = `card-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div
      className="card mb-3"
      style={{
        minHeight: disableAutoHeight ? undefined : "100%",
      }}
    >
      <div
        className="card-header d-flex align-items-center justify-content-between"
        data-bs-toggle={collapsible ? "collapse" : undefined}
        data-bs-target={collapsible ? `#${id}` : undefined}
      >
        <div className="d-flex align-items-center">
          {icon ? <div className="me-2">{icon}</div> : null}
          <span className="d-inline-block">{title}</span>
        </div>
        {actions ? (
          <div className="d-flex align-items-center">
            {actions.map((action, index) => (
              <span key={index} className="ms-2" onClick={action.onClick}>
                {action.icon}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div
        className={classNames("card-body position-relative", {
          collapse: collapsible,
        })}
        id={id}
      >
        {children}
        {loading ? (
          <div
            className="position-absolute top-0 left-0 right-0 bottom-0 w-100 d-flex justify-content-center align-items-center effect-beating-bg-opacity"
            style={{
              marginLeft: "-1rem",
              marginRight: "-1rem",
              zIndex: 10,
            }}
          >
            <div className="spinner-border m-5" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
