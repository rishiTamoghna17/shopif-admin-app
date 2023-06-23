import { Page, Layout } from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";
import Sidebar from "../components/Sidebar";
import {LegacyStack, Badge} from '@shopify/polaris';
import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <LegacyStack >
        <Badge>
          <Sidebar />
        </Badge>
      </LegacyStack>
      <Layout>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
