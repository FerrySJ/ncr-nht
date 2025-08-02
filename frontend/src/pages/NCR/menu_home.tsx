import { Link } from "react-router";

export default function Menu_Home() {

  return (
    <div className="space-y-2">
      <div className="flex justify-center">MENU</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card M1 */}
        <Link to="/ncr-form">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03] cursor-pointer">
          <img
            src="/images/icons/img/menu_report.gif"
            alt="Menu 1"
            width={50}
          />
          <div className="flex-1 text-base font-medium text-gray-800">
            NCR (NON-CONFORMING REPORT)
          </div>
        </div>
        </Link>
        {/* Card M2 */}
        <Link to="/ncr-form">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03] cursor-pointer">
          <img src="/images/icons/img/menu_ncr1.gif" alt="Menu 2" width={50} />
          <div className="flex-1 text-base font-medium text-gray-800">
            ABNORMAL CASE
          </div>
        </div>
        </Link>
        {/* Card M3 */}
        <Link to="">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03] cursor-pointer">
          <img src="/images/icons/img/menu_claim.gif" alt="Menu 3" width={50} />
          <div className="flex-1 text-base font-medium text-gray-800">
            CUSTOMER CLAIM
          </div>
        </div>
        </Link>
        {/* Card M4 */}
        <Link to="">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03] cursor-pointer">
          <img
            src="/images/icons/img/menu_summary.gif"
            alt="Menu 4"
            width={50}
          />
          <div className="flex-1 text-base font-medium text-gray-800">
            SUMMARY
          </div>
        </div>
        </Link>
        <Link to="">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer">
          <img
            src="/images/icons/img/menu_data.png"
            alt="NCR Menu"
            width={35}
          />
          <div className="flex-1 text-base font-medium text-gray-800">
            MASTER CONTROL
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}
