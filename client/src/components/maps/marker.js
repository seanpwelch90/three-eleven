export const WorkMapMarker = ({ left, top, style, children, className, onClick }) => (
  <div className={className} onClick={onClick} style={{
    position: 'absolute',
    left: left - 15,
    top: top - 30,
    width: 15,
    height: 15,
    borderRadius: '100%',
    ...(style || {})
  }}>{children}</div>
)
