/* Learning content: steps, component explanations, comparison, scenarios, glossary. Edit freely. */
window.CDM=window.CDM||{};
(function(C){
const A=['pub','pri','hyb','com'];
C.M={pub:'Public',pri:'Private',hyb:'Hybrid',com:'Community'};
C.STEPS=[
{t:'Introduction',sub:'Why deployment choices matter',show:A,
 plain:'Ravi’s business is growing and needs computers. A deployment model answers two questions: who owns the cloud, and who gets to use it? A wrong choice can waste money or expose data.',
 tech:'NIST defines four deployment models: public, private, community and hybrid. They differ in ownership, tenancy, location and who operates the infrastructure.',
 watch:'All four architectures appear. Orange dots are network traffic; red dashed outlines are security limits.'},
{t:'Traditional Infrastructure',sub:'Your own data center',show:['pri'],act:'pri',trad:1,
 plain:'Ravi first buys servers and keeps them in his own server room. He hires staff to power, cool and repair them. It is all his, but slow to grow, and he pays even when machines sit idle.',
 tech:'Traditional on-premises data center: capital expense, fixed capacity, manual provisioning. The organisation handles power, cooling, networking and patching.',
 watch:'Employees reach servers behind one firewall inside a single organisation-owned building.'},
{t:'Public Cloud',sub:'Shared provider, isolated rooms',show:['pub'],act:'pub',
 plain:'Ravi rents a room in a huge shared commercial building. The owner looks after the building; his room has its own lock, so neighbours cannot enter.',
 tech:'Public cloud (AWS, Azure, Google Cloud): provider-owned, multi-tenant infrastructure reached over the internet, with self-service provisioning, elastic scale and pay-as-you-go billing.',
 watch:'Requests from Customers A, B and C cross the internet to their own isolated environments on shared hardware.'},
{t:'Private Cloud',sub:'Dedicated to one organisation',show:['pub','pri'],act:'pri',
 plain:'Ravi later builds his own dedicated building. Only his company uses it, so he sets every rule, but he also pays for and runs everything.',
 tech:'Private cloud (OpenStack, VMware, Azure Stack HCI): cloud-style self-service on infrastructure dedicated to one organisation, with its own network, security and governance.',
 watch:'Employees pass the firewall and reach dedicated servers and storage over an internal network.'},
{t:'Hybrid Cloud',sub:'Private + public, connected',show:['pub','pri','hyb'],act:'hyb',
 plain:'Ravi keeps customer records in his own building but rents extra space elsewhere for busy sales days. A secure private road joins the two.',
 tech:'Hybrid cloud (AWS Outposts with an AWS Region, Azure Arc, Google Distributed Cloud): on-premises and public cloud linked by VPN or private connectivity so workloads and data can move.',
 watch:'Orange packets flow both ways through the encrypted tunnel between on-premises systems and the public cloud.'},
{t:'Community Cloud',sub:'Shared by similar organisations',show:A,act:'com',
 plain:'Ravi teams up with hospitals that have similar rules. They share one dedicated building, split the cost and follow the same safety rules.',
 tech:'Community cloud: infrastructure shared by organisations with common security, compliance or mission needs; owned and run by members or a third party.',
 watch:'Three organisations send traffic through a policy gateway that enforces common rules before reaching the shared cloud.'},
{t:'Real-World Examples',sub:'AWS, Azure, Google, OpenStack',show:A,tab:'ex',
 plain:'Real companies use each style: big providers rent space, some firms build their own, and many mix both.',
 tech:'Public: AWS, Azure, GCP. Private: OpenStack, VMware, Azure Stack HCI. Hybrid: Outposts, Azure Arc, Google Distributed Cloud. Community: government, healthcare and research clouds.',
 watch:'Read the Examples tab below, then click diagram components to explore them.'},
{t:'Comparison',sub:'Side by side across 8 aspects',show:A,tab:'cmp',
 plain:'Put the four styles side by side to see who owns what, what it costs and who does the maintenance.',
 tech:'Compare ownership, tenancy, control, elasticity, cost model, operations, access path and suitable organisations.',
 watch:'Use the model chips in the Comparison tab to hide or show columns.'},
{t:'Knowledge Quiz',sub:'5 questions, instant feedback',show:A,tab:'quiz',
 plain:'Check what you learned with five questions. You get feedback after every answer.',
 tech:'Questions cover tenancy, ownership, hybrid connectivity and community compliance.',
 watch:'Pick an answer to see an explanation, then continue until you get your score.'}];
C.COMP={
'pub-cust':['Customers','Different companies renting rooms in the same building.','Tenants consume provider services over the internet using consoles, APIs and HTTPS.'],
'pub-net':['Internet','The public road everyone uses to reach the building.','Public network access; traffic is protected with TLS and authenticated API calls.'],
'pub-env':['Isolated environment','Your own locked room inside the shared building.','A tenant account or VPC isolated by virtualization and IAM, so tenants cannot see each other.'],
'pub-hw':['Shared hardware','The machines are shared, but the provider maintains them for you.','Multi-tenant physical servers, storage and network owned and operated by the provider.'],
'pri-user':['Internal users','Your own staff working inside the company network.','Employees reach services over the LAN or corporate VPN with identity-based access.'],
'pri-fw':['Firewall','The guard at the door who checks who may enter.','A network control that allows only approved traffic: a security restriction at the boundary.'],
'pri-srv':['Servers','The computers that run Ravi’s applications.','Dedicated hosts running a hypervisor or private-cloud stack such as OpenStack or VMware.'],
'pri-sto':['Storage','The filing cabinets only Ravi’s company can open.','Dedicated block, file or object storage in the organisation’s data center.'],
'pri-net':['Internal network','Private corridors inside the building.','Segmented VLAN/SDN network that is not exposed to the public internet.'],
'pri-gov':['Governance','The company rulebook for people and data.','Organisation-specific policies for access, audit, retention and compliance.'],
'hyb-onprem':['On-premises systems','Ravi’s own building, where sensitive data stays.','Private data center holding regulated data, legacy systems and local services.'],
'hyb-vpn':['Secure connection','An encrypted private road between the two buildings.','IPsec VPN or private connectivity (Direct Connect, ExpressRoute) joining the networks.'],
'hyb-cloud':['Public cloud resources','Rented space used when extra room is needed.','Elastic compute, backup and web services running in a provider region.'],
'com-org':['Member organisations','Several groups with similar needs.','Tenants from one community, such as hospitals, agencies or universities.'],
'com-gate':['Policy gateway','One shared set of entry rules for every member.','Common identity, access control and security policy enforced at the edge.'],
'com-shared':['Shared platform','One dedicated building used by the whole group.','Community-owned or hosted infrastructure that is not open to the general public.'],
'com-comp':['Common compliance','Everyone follows the same legal safety rules.','Shared controls for standards such as HIPAA, GDPR or government frameworks.'],
'com-cost':['Shared costs','The bill is split between members.','Capital and operating costs are apportioned among community members.']};
C.EX=[
['pub','Public Cloud','Renting a room in a big shared building','AWS, Microsoft Azure, Google Cloud Platform','Scalability, flexibility, rapid provisioning, pay-as-you-go pricing'],
['pri','Private Cloud','Owning a dedicated building','OpenStack, VMware-based private cloud, Azure Stack HCI','Control, customisation, organisation-specific security (you run it)'],
['hyb','Hybrid Cloud','Own building plus rented space elsewhere','AWS Outposts with an AWS Region, Azure Arc, Google Distributed Cloud','Sensitive data stays local; burst to public cloud when busy'],
['com','Community Cloud','Sharing a dedicated building with similar organisations','Government clouds, shared healthcare clouds, university research clouds','Shared compliance, shared costs, controlled access']];
C.CMP=[
['Infrastructure ownership','Cloud provider','One organisation (or its host)','Mix of own and provider','Member organisations or a third party'],
['Resource sharing','Shared by many tenants','Not shared outside the organisation','Private part dedicated, public part shared','Shared by a closed group'],
['Security and control','Shared responsibility with provider','Highest control','Strict control where data is sensitive','Rules agreed by the group'],
['Scalability','Near-unlimited, on demand','Limited by own hardware','Burst to public cloud','Moderate, set by the group'],
['Cost','Pay-as-you-go, low upfront','High upfront and running cost','Balanced','Split among members'],
['Maintenance','Provider handles hardware','Organisation handles everything','Split between both sides','Shared by members or host'],
['Accessibility','Internet, from anywhere','Internal network or VPN','VPN or private link plus internet','Approved members only'],
['Suitable organisations','Startups, web apps, spiky demand','Banks, defence, strict regulation','Enterprises mixing legacy and cloud','Governments, hospitals, universities']];
C.SIM=[
{q:'A startup expects unpredictable traffic and has little money for hardware.',a:'pub',why:'Public cloud gives instant scaling and pay-as-you-go pricing with no hardware to buy.'},
{q:'A bank must keep customer data on dedicated infrastructure it fully controls.',a:'pri',why:'Private cloud gives dedicated resources and full control over governance and regulation.'},
{q:'A company keeps its core database in its own data center but wants web servers on AWS during sales.',a:'hyb',why:'Hybrid cloud connects on-premises systems to public cloud through a secure link.'},
{q:'Several universities want one research computing platform with common rules.',a:'com',why:'Community cloud lets organisations with similar needs share infrastructure and costs.'}];
C.GL=[
['Cloud','Computers and storage you use over a network instead of owning them.'],
['Tenancy','Several customers (tenants) using the same system while staying separated.'],
['Virtualization','Software that splits one physical machine into many virtual ones.'],
['Data center','A building full of servers, storage, networking, power and cooling.'],
['Scalability','The ability to add or remove computing power as demand changes.'],
['Governance','Rules about who may do what with systems and data.'],
['Compliance','Following laws and standards such as HIPAA or GDPR.'],
['VPN','An encrypted tunnel across the internet that links two networks securely.'],
['Private connectivity','A dedicated link (such as AWS Direct Connect or Azure ExpressRoute) that avoids the public internet.'],
['Shared infrastructure','Hardware or services used by more than one customer or organisation.']];
})(window.CDM);
