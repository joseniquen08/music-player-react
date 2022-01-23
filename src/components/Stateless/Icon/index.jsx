import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Icon = ({ icon, color, size, className }) => {
  return (
    <FontAwesomeIcon icon={icon} color={color} size={size} className={className}/>
  );
};
