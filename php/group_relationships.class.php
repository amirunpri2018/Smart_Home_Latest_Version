<?php

/**
 *  description
 * 
 *  @category database files
 *  @author Brody Bruns <brody.bruns@hotmail.com>
 *  @copyright (c) 2016, Brody Bruns
 *  @version 1.0
 * 
 */

class Group_Relationships extends Database{
    protected $tableName= "group_relationships";
    protected $fields = ['id','lightId','groupId'];
    protected $lightId;
    protected $groupId;
    
    public function __construct($light_id, $group_id) {
        parent::__construct();
        $this->lightId = $light_id;
        $this->groupId = $group_id;
        $this->load_by_all_fields(); //in case already in db
    }
    
    public static function getAllRelationships($groupId){
        $lightIds= [];
        $sql = "SELECT lightId from group_relationships WHERE groupId = $groupId;";
        $result = mysqli_query(Database::getConnect(), $sql);
        if($result->num_rows > 0){
            $row = mysqli_fetch_assoc($result);
            foreach ($row as $value) {
                array_push($lightIds, $value);
            }
            return $lightIds;
        }
    }
}
