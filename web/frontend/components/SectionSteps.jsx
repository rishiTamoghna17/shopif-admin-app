import React from 'react'
import {
    Card,
    Page,
    Layout,
    Stack,
    Select,
    Button,
    ButtonGroup,
  } from "@shopify/polaris";
  import { useTranslation, Trans } from "react-i18next";
  import { useState, useCallback, useEffect } from "react";
  import { useAppQuery, useAuthenticatedFetch } from "../hooks";
function SectionSteps() {
    const { t } = useTranslation();
    const [selected, setSelected] = useState("today");
    const [selected2, setSelected2] = useState("is");
    const [selected3, setSelected3] = useState("");
    const fetch = useAuthenticatedFetch();
  
    const handleSelectChange = useCallback((value) => setSelected(value), []);
    const handleSelectChange2 = useCallback((value) => setSelected2(value), []);
  
    const options = [
      { label: "Collections", value: "today" },
      { label: "Yesterday", value: "yesterday" },
      { label: "Last 7 days", value: "lastWeek" },
    ];
  
    const condition = [
      { label: "is", value: "is" },
      { label: "is not", value: "is not" },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await fetch("/api/products");
              console.log("fetchproduct",await response.json());
            } catch (err) {
              console.log(err);
            }
          };
          fetchProducts();
    }, []);

  
    
  return (
    <>
             

          <Layout>
            <Layout.Section>
              <h1 style={{ fontWeight: "bold" }}>
                STEP 1: SELECT WHAT PRODUCTS TO EDIT
              </h1>
              <br />
            </Layout.Section>
            <Layout.Section>
              <Card>
                <Layout>
                  <Layout.Section>
                    <Stack>
                      <Stack.Item></Stack.Item>
                      <Stack.Item>
                        <h2>Products must match all conditions</h2>
                      </Stack.Item>
                    </Stack>
                  </Layout.Section>
                  <Layout.Section>
                    <Stack>
                      <Stack.Item></Stack.Item>
                      <Stack.Item>
                        <Select
                          options={options}
                          onChange={handleSelectChange}
                          value={selected}
                        />
                      </Stack.Item>
                      <Stack.Item>
                        <Select
                          options={condition}
                          onChange={handleSelectChange2}
                          value={selected2}
                        />
                      </Stack.Item>
                      <Stack.Item>
                        <Select />
                      </Stack.Item>
                    </Stack>
                  </Layout.Section>
                  <Layout.Section>
                    <ButtonGroup>
                      <h1></h1>
                      <h1></h1>
                      <Button>Preview matched products</Button>
                      <Button primary>Add product filter condition</Button>
                    </ButtonGroup>
                  </Layout.Section>
                  <Layout.Section></Layout.Section>
                </Layout>
              </Card>
            </Layout.Section>
          </Layout>

          <Layout.Section>
            <hr />
          </Layout.Section>

          <Layout.Section>
            <h1 style={{ fontWeight: "bold" }}>
              STEP 2: PREVIEW SELECTED PRODUCTS
            </h1>
            <br />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <Layout>
                <Layout.Section>
                  <Stack distribution="fillEvenly">
                    <Stack.Item></Stack.Item>
                    <Stack.Item>Title</Stack.Item>
                    <Stack.Item>Variants</Stack.Item>
                    <Stack.Item>Tags</Stack.Item>
                  </Stack>
                </Layout.Section>
                <Layout.Section></Layout.Section>
              </Layout>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <hr />
          </Layout.Section>

          <Layout.Section>
            <h1 style={{ fontWeight: "bold" }}>
              OPTIONAL STEP: SELECT WHAT VARIANTS TO EDIT
            </h1>
            <br />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <Layout>
                <Layout.Section>
                  <Stack>
                    <Stack.Item></Stack.Item>
                    <Stack.Item>
                      Variants must match all following conditions:
                    </Stack.Item>
                  </Stack>
                </Layout.Section>
                <Layout.Section>
                  <Stack distribution="fill">
                    <Stack.Item>
                      <Select />
                    </Stack.Item>
                    <Stack.Item></Stack.Item>
                  </Stack>
                </Layout.Section>
                <Layout.Section>
                  <Stack distribution="fill">
                    <Stack.Item>
                      <Select />
                    </Stack.Item>
                    <Stack.Item></Stack.Item>
                  </Stack>
                </Layout.Section>
                <Layout.Section></Layout.Section>
              </Layout>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <hr />
          </Layout.Section>

          <Layout.Section>
            <h1 style={{ fontWeight: "bold" }}>
              STEP 3: CHOOSE HOW TO EDIT SELECTED PRODUCTS
            </h1>
            <br />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <Layout>
                <Layout.Section>
                  <Stack>
                    <Stack.Item></Stack.Item>
                    <Stack.Item>
                      <h2>Choose an option:</h2>
                    </Stack.Item>
                  </Stack>
                </Layout.Section>
                <Layout.Section>
                  <Stack>
                    <Stack.Item></Stack.Item>
                    <Stack.Item>
                      <Select />
                    </Stack.Item>
                    <Stack.Item>
                      <Select />
                    </Stack.Item>
                    <Stack.Item>
                      <Select />
                    </Stack.Item>
                  </Stack>
                </Layout.Section>
                <Layout.Section>
                  <ButtonGroup>
                    <h1></h1>
                    <h1></h1>
                    <Button>Schedule Bulk Edit</Button>
                    <Button primary>Start Bulk Edit Now</Button>
                  </ButtonGroup>
                </Layout.Section>
                <Layout.Section></Layout.Section>
              </Layout>
            </Card>
          </Layout.Section>
    </>
  )
}

export default SectionSteps