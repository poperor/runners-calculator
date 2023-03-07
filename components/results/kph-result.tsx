import { ResultProps } from "../../lib/conversion";
import utilityStyles from '../../styles/utility.module.css'
import resultStyles from './result.module.css'

export const KphResult = ({ canonicalKph }: ResultProps) => {
  return (
    <div className={`${utilityStyles.verticalAlign} ${resultStyles.result}`}>
      {canonicalKph > 0 && <div>{canonicalKph.toFixed(1)}</div>}
    </div>
  );
};
