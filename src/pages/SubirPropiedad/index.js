import { Layout } from '../../components/Layout';
import withAuth from '../../hoc/withAuth';
import PropertyUploadForm from "../../components/PropertyUploader";
import PropertyManageList from '../../components/PropertyManageList';




export const SubirPropiedad = () => {
  return (
    <>
    <Layout>
    <PropertyUploadForm />
    <PropertyManageList />

    </Layout>
    </>
  );
};

export default withAuth(SubirPropiedad);
