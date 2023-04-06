import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs';

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue='nodejs' className='w-full max-w-2xl'>
      <TabsList>
        <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
        <TabsTrigger value='python'>Python</TabsTrigger>
      </TabsList>

      <TabsContent value='nodejs'></TabsContent>
      <TabsContent value='python'></TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
