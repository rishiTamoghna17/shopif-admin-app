import {
  Card,
  Page,
  Layout,
  Stack,
  Select,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import Sidebar from "../components/Sidebar";
import { ProductsCard } from "../components";
import SectionSteps from "../components/SectionSteps";

export default function HomePage() {
  return (
    <Page fullWidth>
      <Stack wrap={false}>

        <Stack.Item>
          <Sidebar />
        </Stack.Item>

        <Stack.Item fill>

          <Layout>
            <Layout.Section>
              <ProductsCard />
            </Layout.Section>

            <Layout.Section>
              <SectionSteps />
            </Layout.Section> 
          </Layout>

        </Stack.Item>
      </Stack>
    </Page>
  );
}
