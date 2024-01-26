// Tools
import { useSelector } from '../../tools/hooks'; /* Typed selector */

// MarkerGen middleware
import { useReportForDomainThunk } from './thunk'; /* Choose one technology, Saga or Thunk */

export const useReportForDomain = () => {
    // MarkerGen api hook
    const reportForDomainThunk = useReportForDomainThunk();  /* Thunk api hook */

    const reportForDomain = useSelector((state) => state.reportForDomain);

    return {
        ...reportForDomainThunk,
        reportForDomain,
    };
};
