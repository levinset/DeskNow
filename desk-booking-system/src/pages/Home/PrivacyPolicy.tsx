//import libaries and components

import Footer from "../../components/general/Footer";
import Header from "../../components/general/Header";

//main component
export default function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <div className="container py-8 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>

        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="mb-2 text-xl font-bold">
            Data Protection Declaration
          </h2>
          <p className="mb-4">
            The protection of your personal data is of utmost importance to us.
            In this data protection declaration, we inform you about the most
            important aspects of data processing within our website.
          </p>
        </div>

        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="mb-2 text-xl font-bold">Controller</h2>
          <p className="mb-4">
            DeskNow
            <br />
            Klagenfurt
            <br />
            info@desknow.com
          </p>
        </div>

        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="mb-2 text-xl font-bold">Data Processing</h2>
          <p className="mb-4">
            We process personal data of our users only to the extent necessary
            to provide a functioning website as well as our contents and
            services. The processing of personal data of our users takes place
            regularly only after obtaining consent of the user. An exception
            applies in those cases where prior consent cannot be obtained for
            factual reasons and the processing of the data is permitted by
            statutory provisions.
          </p>
        </div>

        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="mb-2 text-xl font-bold">Data Storage</h2>
          <p className="mb-4">
            We only store personal data for as long as it is necessary to
            achieve the purposes for which it was collected, or as required by
            law. We implement appropriate technical and organizational measures
            to ensure the security of your data.
          </p>
        </div>

        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="mb-2 text-xl font-bold">User Rights</h2>
          <p className="mb-4">
            Users have the right to request information about their stored data,
            its origin, recipients, and the purpose of data processing. They
            also have the right to request correction, blocking, or deletion of
            this data. For inquiries regarding data protection, please contact
            [Your Company Contact Person] at [Your Company Contact Email].
          </p>
        </div>

        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="mb-2 text-xl font-bold">
            Changes to this Privacy Policy
          </h2>
          <p className="mb-4">
            We reserve the right to update this privacy policy at any time. We
            encourage users to frequently check this page for any changes to
            stay informed about how we are helping to protect the personal
            information we collect. You acknowledge and agree that it is your
            responsibility to review this privacy policy periodically and become
            aware of modifications.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
