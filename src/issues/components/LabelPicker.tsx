import { Loading } from '../../shared/Loading';
import { useLabels } from '../hooks/useLabels';

type LabelPickerProps = {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker = ({ selectedLabels, onChange }: LabelPickerProps) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <Loading />;
  }

  console.log(selectedLabels);

  return (
    <div>
      {
        labelsQuery.data?.map(label => (
          <span
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={() => onChange(label.name)}
          >
            {label.name}
          </span>
        ))
      }
    </div>
  )
}
