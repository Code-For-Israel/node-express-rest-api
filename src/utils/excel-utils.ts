import xlsx from 'xlsx';
import { dynamoService } from '../services/dynamo-service';
import { logger } from './logger';

class ExcelUtils {
  public async upload2Dynamo(filePath: string) {
    const tableName = process.env.MEDICINE_NAMES_TABLE!;

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet);

    rows.forEach(async (row: any) => {
      const medicineName = (row['name'] as string)?.trim()?.replaceAll(/\u200E/g,'');
      if (!medicineName) {
        return;
      }

      const item = {
        medicine_id: { S: '' + row['code'] },
        first_letter: { S: medicineName.toUpperCase().charAt(0) },
        name_in_upper_case: { S: medicineName.toUpperCase() },
        name: { S: medicineName },
        name_in_second_lang: { S: '' }
      };

      await dynamoService.putItem(tableName, item);
    });

    logger.info(`Data from ${filePath} has been successfully uploaded to DynamoDB table ${tableName}.`);
  }
}

export const excelUtils = new ExcelUtils();