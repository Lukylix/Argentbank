import "./FeatureItem.css";

export default function FeatureItem({ icon, alt, title, description }: IFeatureItemProps) {
  return (
    <div className="feature-item">
      <img src={icon} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
