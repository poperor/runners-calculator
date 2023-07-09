import { ResultProps, toMph } from "../../lib/conversion";
import utilityStyles from '../../styles/utility.module.css'
import resultStyles from './result.module.css'

export const MphResult = ({ canonicalKph }: ResultProps) => {
  const mph = toMph(canonicalKph);
  return (
    <div className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}>
      {Number(mph) > 0  && <div>{Number(mph).toFixed(1)}</div>}
    </div>
  );
};
