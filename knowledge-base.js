/**
 * =============================================
 * InfoSys AI — Knowledge Base
 * Information Management System (IMS) Expert System
 * =============================================
 */

const KnowledgeBase = {

    // ── Requirement Categories (Replacing Symptoms) ──
    symptomCategories: [
        {
            id: 'operations',
            name: 'Business Operations',
            icon: '🏢',
            color: '#06d6a0',
            symptoms: [
                'inventory_tracking', 'order_management', 'supply_chain', 'human_resources', 
                'payroll', 'financial_accounting', 'manufacturing_control'
            ]
        },
        {
            id: 'customer',
            name: 'Customer & Sales',
            icon: '👥',
            color: '#118ab2',
            symptoms: [
                'lead_tracking', 'sales_pipeline', 'customer_support', 'marketing_automation',
                'contact_management', 'customer_loyalty', 'email_integration'
            ]
        },
        {
            id: 'data_issues',
            name: 'System Issues',
            icon: '⚠️',
            color: '#ef476f',
            symptoms: [
                'data_silos', 'slow_reporting', 'duplicate_entries', 'lost_files',
                'manual_data_entry', 'version_control_issues', 'security_vulnerabilities'
            ]
        },
        {
            id: 'tech_pref',
            name: 'Technical Needs',
            icon: '⚙️',
            color: '#7c3aed',
            symptoms: [
                'cloud_based', 'on_premise', 'mobile_access', 'real_time_sync',
                'api_integration', 'offline_mode', 'scalability'
            ]
        },
        {
            id: 'knowledge',
            name: 'Knowledge & Content',
            icon: '📚',
            color: '#ffd166',
            symptoms: [
                'document_indexing', 'content_creation', 'internal_wiki', 'file_sharing',
                'digital_assets', 'workflow_automation', 'archiving'
            ]
        }
    ],

    // ── Requirement Display Names ──
    symptomNames: {
        'inventory_tracking': 'Inventory & Stock Tracking',
        'order_management': 'Order Processing',
        'supply_chain': 'Supply Chain Management',
        'human_resources': 'Employee Management (HR)',
        'payroll': 'Payroll Processing',
        'financial_accounting': 'Financial Accounting',
        'manufacturing_control': 'Manufacturing Control',
        'lead_tracking': 'Sales Lead Tracking',
        'sales_pipeline': 'Sales Pipeline Management',
        'customer_support': 'Customer Support Desk',
        'marketing_automation': 'Marketing Automation',
        'contact_management': 'Contact Management',
        'customer_loyalty': 'Customer Loyalty Programs',
        'email_integration': 'Email Integration',
        'data_silos': 'Isolated Data (Silos)',
        'slow_reporting': 'Slow/Manual Reporting',
        'duplicate_entries': 'Duplicate Data Entries',
        'lost_files': 'Difficulty Finding Files',
        'manual_data_entry': 'Heavy Manual Data Entry',
        'version_control_issues': 'Document Version Issues',
        'security_vulnerabilities': 'Security Concerns',
        'cloud_based': 'Cloud/Web Based',
        'on_premise': 'Local/On-Premise Server',
        'mobile_access': 'Mobile App Access',
        'real_time_sync': 'Real-time Synchronization',
        'api_integration': 'Third-party API Integration',
        'offline_mode': 'Offline Functionality',
        'scalability': 'Future Scalability',
        'document_indexing': 'Document Indexing/Search',
        'content_creation': 'Web Content Creation',
        'internal_wiki': 'Internal Knowledge Base',
        'file_sharing': 'File Sharing & Collaboration',
        'digital_assets': 'Digital Asset Management',
        'workflow_automation': 'Workflow Automation',
        'archiving': 'Compliance & Archiving'
    },

    // ── Recommended Systems (Replacing Diseases) ──
    diseases: {
        'erp_system': {
            name: 'Enterprise Resource Planning (ERP)',
            severity: 'high',
            description: 'A comprehensive suite of integrated applications used to manage and automate back-office functions related to technology, services, and human resources.',
            symptoms: ['financial_accounting', 'inventory_tracking', 'human_resources', 'supply_chain', 'manufacturing_control', 'real_time_sync'],
            minSymptoms: 3,
            recommendation: 'Implement an ERP like SAP, Oracle NetSuite, or Microsoft Dynamics 365. This will consolidate your financial and operational data into a single source of truth.'
        },
        'crm_system': {
            name: 'Customer Relationship Management (CRM)',
            severity: 'medium',
            description: 'A system for managing all your company\'s relationships and interactions with customers and potential customers.',
            symptoms: ['lead_tracking', 'sales_pipeline', 'customer_support', 'marketing_automation', 'contact_management', 'email_integration'],
            minSymptoms: 3,
            recommendation: 'Adopt a CRM solution like Salesforce, HubSpot, or Zoho CRM. This will help your sales team track interactions and improve customer retention.'
        },
        'dms_system': {
            name: 'Document Management System (DMS)',
            severity: 'low',
            description: 'A system used to track, manage and store documents and reduce paper. Most are capable of keeping a record of the various versions created and modified by different users.',
            symptoms: ['lost_files', 'version_control_issues', 'document_indexing', 'file_sharing', 'archiving'],
            minSymptoms: 3,
            recommendation: 'Look into DMS platforms like SharePoint, M-Files, or DocuWare to organize your digital assets and ensure version control.'
        },
        'kms_system': {
            name: 'Knowledge Management System (KMS)',
            severity: 'low',
            description: 'A system for storing and retrieving knowledge, improving collaboration, locating knowledge sources, mining repositories for hidden knowledge, capturing and using knowledge.',
            symptoms: ['internal_wiki', 'content_creation', 'document_indexing', 'workflow_automation'],
            minSymptoms: 2,
            recommendation: 'Consider tools like Confluence, Notion, or Guru to build an internal knowledge base and reduce information silos.'
        },
        'hris_system': {
            name: 'Human Resource Information System (HRIS)',
            severity: 'medium',
            description: 'A software solution that maintains, manages, and processes detailed employee information and human resources-related policies and procedures.',
            symptoms: ['human_resources', 'payroll', 'manual_data_entry', 'scalability'],
            minSymptoms: 2,
            recommendation: 'Implement an HRIS like Workday, BambooHR, or Gusto to automate payroll and employee lifecycle management.'
        },
        'cms_system': {
            name: 'Content Management System (CMS)',
            severity: 'low',
            description: 'A software application that can be used to manage the creation and modification of digital content.',
            symptoms: ['content_creation', 'digital_assets', 'workflow_automation', 'cloud_based'],
            minSymptoms: 2,
            recommendation: 'Use a CMS like WordPress, Contentful, or Adobe Experience Manager for managing your public-facing or internal digital content.'
        },
        'scm_system': {
            name: 'Supply Chain Management (SCM)',
            severity: 'high',
            description: 'The management of the flow of goods and services, involving the movement and storage of raw materials, of work-in-process inventory, and of finished goods.',
            symptoms: ['supply_chain', 'order_management', 'manufacturing_control', 'api_integration'],
            minSymptoms: 2,
            recommendation: 'Look into SCM specialists like Blue Yonder, Manhattan Associates, or Oracle SCM for global supply chain visibility.'
        },
        'wms_system': {
            name: 'Warehouse Management System (WMS)',
            severity: 'medium',
            description: 'A software application designed to support and optimize warehouse or distribution center management.',
            symptoms: ['inventory_tracking', 'order_management', 'offline_mode', 'real_time_sync'],
            minSymptoms: 3,
            recommendation: 'For dedicated warehouse operations, consider Fishbowl, NetSuite WMS, or Körber.'
        },
        'pos_system': {
            name: 'Point of Sale (POS)',
            severity: 'low',
            description: 'The place where a customer makes a payment for products or services at your store.',
            symptoms: ['order_management', 'inventory_tracking', 'customer_loyalty', 'offline_mode'],
            minSymptoms: 3,
            recommendation: 'For retail or F&B operations, Square, Shopify POS, or Toast are excellent choices.'
        },
        'itsm_system': {
            name: 'IT Service Management (ITSM)',
            severity: 'medium',
            description: 'The activities that are performed by an organization to design, build, operate, and control information technology services.',
            symptoms: ['customer_support', 'workflow_automation', 'version_control_issues', 'security_vulnerabilities'],
            minSymptoms: 2,
            recommendation: 'Adopt ITSM tools like ServiceNow, Jira Service Management, or Freshservice for IT operations.'
        },
        'data_warehouse': {
            name: 'Data Warehouse / BI System',
            severity: 'high',
            description: 'A system used for reporting and data analysis, and is considered a core component of business intelligence.',
            symptoms: ['data_silos', 'slow_reporting', 'duplicate_entries', 'api_integration', 'scalability'],
            minSymptoms: 3,
            recommendation: 'Build a Data Warehouse using Snowflake, BigQuery, or Amazon Redshift combined with BI tools like Tableau or Power BI.'
        }
    },

    // ── Inference Rules (IF-THEN) ──
    rules: [
        {
            id: 'R01',
            conditions: ['financial_accounting', 'inventory_tracking', 'supply_chain'],
            conclusion: 'erp_system',
            cf: 0.95,
            description: 'IF business needs Accounting AND Inventory AND Supply Chain THEN recommend ERP (CF=0.95)'
        },
        {
            id: 'R02',
            conditions: ['lead_tracking', 'sales_pipeline', 'contact_management'],
            conclusion: 'crm_system',
            cf: 0.92,
            description: 'IF business needs Lead Tracking AND Sales Pipeline THEN recommend CRM (CF=0.92)'
        },
        {
            id: 'R03',
            conditions: ['lost_files', 'version_control_issues', 'document_indexing'],
            conclusion: 'dms_system',
            cf: 0.9,
            description: 'IF problem is Lost Files AND Version Issues THEN recommend DMS (CF=0.9)'
        },
        {
            id: 'R04',
            conditions: ['internal_wiki', 'content_creation'],
            conclusion: 'kms_system',
            cf: 0.85,
            description: 'IF business needs Wiki AND Content Creation THEN recommend KMS (CF=0.85)'
        },
        {
            id: 'R05',
            conditions: ['human_resources', 'payroll'],
            conclusion: 'hris_system',
            cf: 0.9,
            description: 'IF business needs HR AND Payroll THEN recommend HRIS (CF=0.9)'
        },
        {
            id: 'R06',
            conditions: ['data_silos', 'slow_reporting', 'duplicate_entries'],
            conclusion: 'data_warehouse',
            cf: 0.88,
            description: 'IF problem is Data Silos AND Slow Reporting THEN recommend Data Warehouse (CF=0.88)'
        },
        {
            id: 'R07',
            conditions: ['manufacturing_control', 'inventory_tracking', 'real_time_sync'],
            conclusion: 'erp_system',
            cf: 0.85,
            description: 'IF needs Manufacturing AND Inventory AND Real-time Sync THEN recommend ERP (CF=0.85)'
        },
        {
            id: 'R08',
            conditions: ['supply_chain', 'order_management'],
            conclusion: 'scm_system',
            cf: 0.8,
            description: 'IF needs Supply Chain AND Order Management THEN recommend SCM (CF=0.8)'
        },
        {
            id: 'R09',
            conditions: ['inventory_tracking', 'offline_mode'],
            conclusion: 'pos_system',
            cf: 0.75,
            description: 'IF needs Inventory AND Offline POS THEN recommend POS System (CF=0.75)'
        },
        {
            id: 'R10',
            conditions: ['customer_support', 'security_vulnerabilities'],
            conclusion: 'itsm_system',
            cf: 0.82,
            description: 'IF needs Support AND Security THEN recommend ITSM (CF=0.82)'
        }
    ],

    getSymptomName(symptomId) {
        return this.symptomNames[symptomId] || symptomId.replace(/_/g, ' ');
    },

    getAllSymptoms() {
        const symptoms = new Set();
        this.symptomCategories.forEach(cat => {
            cat.symptoms.forEach(s => symptoms.add(s));
        });
        return Array.from(symptoms);
    },

    getDisease(diseaseId) {
        return this.diseases[diseaseId] || null;
    },

    getAllDiseases() {
        return Object.entries(this.diseases).map(([id, data]) => ({
            id,
            ...data
        }));
    }
};
